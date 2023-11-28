### Abstração

Modelo ou representação que expõe o essencial e omite detalhes.

## Clean code

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

#### Regra de dependência [*](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=single%20actionable%20idea.-,The%20Dependency%20Rule,-The%20concentric%20circles)

- As dependências do código fonte só podem apontar para camadas internas.
- Uma camada não deve saber absolutamente nada sobre uma camada mais externa.