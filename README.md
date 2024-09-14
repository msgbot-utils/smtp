# SMTP modules
>
> # example
> ```js
> let smtp = require("smtp");
> let mail = new smtp("smtp.gmail.com", "SSL", "example@gmail.com", "password");
>
> mail.to("target@gmail.com");
> mail.from("module" /** what's it? */);
> mail.setTitle("check to verify code!");
> mail.setContent("3461", "text/plain" /** default type */);
>
> mail.send();
> ```
