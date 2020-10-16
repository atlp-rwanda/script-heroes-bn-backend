const template = ({ url, token }) => `
        <html>
        <head>
          <style>
            .title {
              font-family: Lancelot;
              font-size: 30px;
              color: #f9a826;
              margin-bottom: 30px;
            }
            .container {
              font-size: 18px;
              font-family: Lato;
              padding: 30px;
              border: #000 1px solid;
              color: #728191;
              border-radius: 20px;
              box-shadow: 0px 0px 10px gray;
            }
            .btn {
              background-color: #f9a826;
              text-align: center;
              padding: 10px;
              border-radius: 10px;
              text-decoration: none;
              color: #000;
            }
            .link {
              text-decoration: none;
              color: #f9a826;
            }
          </style>
        </head>
        <body>
          <p>
            <span class="title">Barefoot NOMAD</span>
          </p>
          <div class="container">
            <h2>Reset password</h2>
            <p>Click the link below to reset you password:</p>
            <a href="${url}/api/resetpassword/${token}" class="btn">Reset password</a>
            <p>© Barefoot Nomad Kigali-Rwanda, KK 5 Av</p>
            <p>
              <a href="#" class="links">YouTube</a>
              <a href="#" class="links">Instagram</a>
              <a href="#" class="links">Twitter</a>
              <a href="#" class="links">Facebook</a>
              <a href="#" class="links">LinkedIn</a>
            </p>
          </div>
          <p><a href="#" class="links">Unsubscribe</a></p>
        </body>
        </html>
      `;
export default template;
