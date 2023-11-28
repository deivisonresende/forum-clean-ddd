### Abstração

Modelo ou representação que expõe o essencial e omite detalhes.

## A arquitetura limpa

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

#### A regra de dependência

- As dependências do código fonte só podem apontar para camadas internas.
- Uma camada não pode saber absolutamente nada sobre uma camada mais externa.