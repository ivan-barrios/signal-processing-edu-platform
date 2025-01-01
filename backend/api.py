from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sympy import symbols, periodicity, Interval, solveset, S, sin, cos, exp, integrate, oo, limit, log, sinc, Heaviside, Piecewise, Abs, Or, Union
from pydantic import BaseModel

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the symbolic variable
t = symbols("t")

# Define the cajón (rectangular pulse) function
def rect(t, width=1):
    """Define the rectangular pulse function (cajón)."""
    return Piecewise((1, Abs(t) <= width / 2), (0, True))

def is_function_convergent(func):
    """Check if the function decays to 0 as t -> ±∞"""
    try:
        # Handle Piecewise functions explicitly
        if isinstance(func, Piecewise):
            # Extract nonzero conditions from the Piecewise function
            nonzero_conditions = [cond for expr, cond in func.args if expr != 0]

            # Combine the conditions into a single condition
            combined_condition = Or(*nonzero_conditions)

            # Solve the combined condition to find the support
            support = solveset(combined_condition, t, domain=S.Reals)

            # Explicitly check the type of support
            if isinstance(support, Interval):
                return support.start.is_finite and support.end.is_finite
            elif isinstance(support, Union):
                # Check if all components of the union are finite intervals
                return all(
                    isinstance(part, Interval) and part.start.is_finite and part.end.is_finite
                    for part in support.args
                )
            elif support == S.Reals:
                return False  # Infinite support
            else:
                return False  # Unsupported type of support

        # General case: Check limits for non-Piecewise functions
        limit_pos = limit(func, t, oo)
        limit_neg = limit(func, t, -oo)
        return limit_pos == 0 and limit_neg == 0
    except Exception:
        return False

# Define the request schema using Pydantic
class CalculateMetricsRequest(BaseModel):
    func_str: str

@app.post("/calculate-metrics")
async def calculate_metrics(request: CalculateMetricsRequest):
    """
    Calculate power, energy, and mean of a given function string.
    Automatically handles periodicity, infinite ranges, and special cases.
    """
    try:
        # Parse the function into a SymPy expression
        try:
            # Safely evaluate the function string using allowed symbols
            func = eval(request.func_str, {
                "sin": sin, "cos": cos, "exp": exp, "log": log,
                "t": t, "sinc": sinc, "u": Heaviside, "rect": rect
            })
        except Exception as e:
            return {"error": f"Invalid function string: {str(e)}"}

        # Detect periodicity
        try:
            period = periodicity(func, t)
        except Exception as e:
            return {"error": f"Failed to detect periodicity: {str(e)}"}

        if period:  # Handle periodic functions
            t_start = 0
            t_end = float(period)

            # Energy is infinite for periodic functions
            energy = "infinity"

            # Compute power and mean over one period
            power = integrate(func**2, (t, t_start, t_end)) / period
            mean = integrate(func, (t, t_start, t_end)) / period

            # Ensure numeric evaluation
            power = float(power.evalf())
            mean = float(mean.evalf())
        else:  # Handle non-periodic functions
            if is_function_convergent(func):  # Check if the function decays
                try:
                    # Compute energy over [-∞, ∞]
                    energy = integrate(func**2, (t, -oo, oo))
                    energy = float(energy.evalf())

                    # Power and mean are undefined for non-periodic, finite energy functions
                    power = "undefined (non-periodic)"
                    mean = "undefined (non-periodic)"
                except Exception as e:
                    return {"error": f"Integration failed for decaying function: {str(e)}"}
            else:  # Function does not decay
                energy = "infinity"
                power = "undefined (non-periodic and non-decaying)"
                mean = "undefined (non-periodic and non-decaying)"

        # Return the results
        return {
            "period": float(period) if period else None,
            "energy": energy,
            "power": power if isinstance(power, str) else round(power, 6),
            "mean": mean if isinstance(mean, str) else round(mean, 6),
        }
    except Exception as e:
        return {"error": f"Error processing function: {str(e)}"}
