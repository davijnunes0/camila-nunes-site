# Camila Nunes Advocacia — Site Institucional

Site institucional desenvolvido para a Dra. Camila Nunes, advogada
especialista em Direito Previdenciário (OAB/GO 67.408).

## 📁 Estrutura de arquivos

```
camila-nunes-site/
├── index.html              ← Estrutura HTML do site
├── css/
│   └── style.css           ← Todos os estilos visuais
├── js/
│   └── script.js           ← Lógica do formulário e animações
└── assets/
    ├── logo-light-opt.png  ← Logo (fundo transparente)
    ├── logo-dark-opt.jpg   ← Logo (fundo preto)
    ├── camila-retrato.jpg  ← Foto retrato
    └── camila-escritorio.jpg ← Foto no escritório
```

## 🚀 Como usar

### Para visualizar localmente
Basta abrir o `index.html` em qualquer navegador (Chrome, Firefox, Safari, Edge).

### Para publicar na internet
Faça upload de TODA a pasta para qualquer hospedagem:
- **Hostinger, HostGator, GoDaddy** (hospedagem tradicional)
- **Netlify, Vercel, GitHub Pages** (gratuitas, ótimas para sites estáticos)
- **Locaweb, KingHost** (brasileiras)

O site é estático — não precisa de banco de dados, PHP, Node.js, nada.

---

## ⚙️ Configurações necessárias ANTES de publicar

### 1. Número de WhatsApp
Abra o arquivo `js/script.js` e altere a linha:
```javascript
whatsappNumber: '55628435929',
```
Substitua pelo número real (formato: 55 + DDD + número, sem espaços ou símbolos).

### 2. Telefone e e-mail no HTML
No arquivo `index.html`, busque e substitua:
- `55628435929` → seu número real
- `contato@camilanunesadvocacia.com.br` → e-mail real
- `55628435929` → telefone formatado para exibição

### 3. Endereço e horários
Procure no `index.html` por "Anápolis · Goiânia" e ajuste conforme necessário.

### 4. Instagram
Procure por `href="#">Instagram` no footer e coloque o link real.

---

## 📬 Como o formulário envia os dados?

**Por padrão, o formulário envia via WhatsApp.**

Quando o visitante preenche e clica em "Enviar Mensagem":
1. O JavaScript captura todos os dados (nome, telefone, e-mail, assunto, mensagem).
2. Abre uma nova aba do WhatsApp da Dra. Camila com a mensagem
   já pronta, formatada assim:

   ```
   *Nova solicitação pelo site*

   *Nome:* João Silva
   *Telefone:* (62) 9 8888-7777
   *E-mail:* joao@email.com
   *Assunto:* Aposentadoria Rural

   *Mensagem:*
   Sou trabalhador rural há 30 anos e preciso de orientação...
   ```

3. O visitante só precisa clicar em "enviar" no WhatsApp dele.

### ✅ Vantagens dessa abordagem
- **Funciona imediatamente**, sem servidor, sem custo, sem cadastro.
- O contato vai **direto para o WhatsApp** da advogada.
- A advogada pode responder rapidamente, mantendo histórico no próprio WhatsApp.
- Não precisa configurar e-mail SMTP, hospedagem com PHP, nem nada técnico.

### 📧 Quer receber também por e-mail?

Para receber os dados por e-mail (além do WhatsApp), você precisa de
um back-end. A forma mais fácil é usar o **Formspree**:

1. Acesse [formspree.io](https://formspree.io) e crie uma conta gratuita.
2. Crie um novo "form" e copie o endpoint (algo como `https://formspree.io/f/xxxxxx`).
3. Abra `js/script.js` e cole o endpoint na linha:
   ```javascript
   formEndpoint: 'https://formspree.io/f/xxxxxx',
   ```
4. Pronto! Os dados chegam no e-mail cadastrado **e** o WhatsApp continua
   abrindo normalmente. Plano gratuito = 50 envios/mês.

Outras opções no `js/script.js`, ao final do arquivo (com instruções).

---

## 🎨 Personalizações comuns

| Quero alterar...    | Onde mexer                                     |
|---------------------|------------------------------------------------|
| Cores               | `css/style.css` → bloco `:root` (variáveis)    |
| Textos              | `index.html`                                   |
| Áreas de atuação    | `index.html` → seção `services-grid`           |
| Perguntas do FAQ    | `index.html` → seção `faq-list`                |
| Depoimento          | `index.html` → seção `testimonial`             |
| Fotos               | substitua os arquivos em `assets/`             |
| WhatsApp number     | `js/script.js` → CONFIG.whatsappNumber         |

---

## ⚖️ Conformidade ética (OAB)

O site segue o **Provimento 205/2021** do Conselho Federal da OAB:
- Não há promessas de resultado.
- Não há captação de clientela ou mercantilização da profissão.
- Há disclaimer no footer.
- O conteúdo é estritamente informativo.

Antes de publicar, recomendo revisar os textos com olhar atento à
publicidade ética. Em caso de dúvida, consulte o Tribunal de Ética da
OAB/GO.

---

## 🛠️ Suporte técnico

Em caso de dúvidas sobre customização, hospedagem ou ajustes,
guarde este projeto e procure um(a) desenvolvedor(a) de confiança —
qualquer profissional consegue trabalhar com este código padrão
(HTML5 + CSS3 + JavaScript vanilla).
