# Signal Processing Educational Platform

## Overview

This project is a web-based **Signal Processing Educational Platform** designed to help users understand and interact with key concepts in signal processing. It provides an intuitive interface to create, modify, and visualize signals, enabling users to explore how different filters and transformations affect signals in both the time and frequency domains. This platform serves as an educational tool for students, engineers, and enthusiasts who want to deepen their understanding of signal processing principles.

---

## Features

### 1. **Interactive Signal Visualization**

- Graph signals dynamically in the time and frequency domains.
- Modify signal parameters (e.g., amplitude, frequency) and observe changes in real time.

### 2. **Toolset for Signal Analysis**

- Toggle between time-domain and frequency-domain views.
- Zoom, pan, and interact with signal plots.
- Compute key properties such as:
  - Signal power.
  - Mean value.
  - Signal energy.

### 3. **Custom Signal Input**

- Input mathematical functions to define custom signals.
- Support for predefined and user-defined signal types, such as:
  - Rectangular functions (e.g., `rect`)
  - Triangular functions (e.g., `tri`)
  - Sinc functions (e.g., `sinc`)
  - Heaviside step functions, and more.

### 4. **Filter Application**

- Apply common signal processing filters (low-pass, high-pass, band-pass, etc.).
- Design and implement custom filters for advanced users.

### 5. **Educational Support**

- Includes an integrated chatbot that answers questions about signal processing concepts, applications, and mathematical foundations.
- Provides explanations for transformations, filters, and properties in an easy-to-understand format.

---

## Goals and Objectives

### **What We Aim For:**

1. **Educational Excellence:**

   - Build a platform that demystifies complex signal processing concepts through visualization and interaction.
   - Make it accessible for beginners while providing depth for advanced users.

2. **Interactive Learning:**

   - Create an engaging and user-friendly interface where users can experiment with real-world signals and their transformations.

3. **Customizability:**

   - Allow users to define custom signals and filters, giving them the flexibility to explore beyond predefined options.

4. **Real-Time Feedback:**

   - Enable immediate visualization of how modifications to signals and filters impact their properties, fostering deeper understanding.

---

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you have suggestions, bugs to report, or features to add.

---

## License

This project is licensed under the [MIT License](LICENSE).

Comments from Santiago Rodriguez (IPS Teacher):
Te paso algunos comentarios básicos:

Comentarios sobre https://signal-processing-edu-platform.vercel.app/

Pros:

1. Permite generar funciones

Adds:

1. Podría agregarse el control sobre los ejes. Lo que en octave sería "xlim" "ylim".
   Esto permitiría mostrar el gráfico en los intervalos deseados por el usuario.
   Por el momento el eje "x" parece fijo entre -10 y 10.
   Esto es muy importante si por ejemplo dibujo un triángulo centrado en 10...no se vería completamente así como está ahora.

2. En línea con lo anterior, podría ajustarse la altura a mostrar no al "máximo" de la función
   como pareciera ahora, sino que los "ylim" por defecto podrían estar a 1.2 del máximo y 1.2 del minimo.
   Como para que quede un espacio entre el fin del gráfico y la señal.

3. No pude lograr que funcionen los cálculos de pot, valor medio y energía. Dice "loading" pero no veo que termine.

4. Podría agregarse al lado de cada señal la opción de que sea una secuencia. Esto implicaría graficar la señal solamente en puntos para instantes enteros de "t". Obtener algo como el comando "stem" de octave.
