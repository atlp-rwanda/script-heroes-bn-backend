const email = ({ user, lineManager, approveLink, viewLink }) => {
  const template = `<!doctype html>
  <html>
  <head>
    <style>
    body {
      text-align: center
    }
    .text {
      font-family: Lato;
      font-style:normal;
      font-weight: normal;
      font-size: 16px;
    }
  
    h2 {             
      color: #F9A826;
      line-height: 43px;
      }
  
    h3 {
      color: #728191;
    }
  
    button{
      padding: 10px 30px;
    background:#F9A826;
    border-radius: 10px;
    margin-left:2em;
    border: 0;
    }
    button:hover{
      background-color: #72819130;
    }
  
    #footer{
      margin-top:2em;
      border:#728191;
      border-radius: 10px;
      border-style: solid;
      border-width: 1px;
      width: 300px;
      text-align: center;
      margin: 30px auto;
    }
    #footer p{
      line-height: 12px;
      color: #728191;
    }
    
    #socials li{
      display: inline;
      color: #F9A826;
      padding-top: 0.5em;
      padding-right:0.5em;
      padding-bottom: 0.5em;
      font-size:12px;
    }
    #socials li:hover{
      text-decoration: underline;
    }
    h5{
      margin-left:4em;
      color: #728191;
    }
    h5:hover{
      color:#F9A826;
    }
    </style>
    </head>
    <body>
    
    <h2 class='text'>Dear ${lineManager.firstName},</h2>
    <h3 class='text'>${user.firstName} ${user.lastName} has requested a trip</h3>
    <h3 class='text'>Click Approve to approve the request, or click View to view the request information</h3>
    <a href = "${approveLink}"><button class='text'>Approve</button></a>
    <a href = "${viewLink}"><button class='text'>View</button></a>
    <div id = "footer">
      <p class='text'> Barefoot Nomad Kigali-Rwanda, KK 5 Av </p>
      <div id = "socials">
        <ul>
          <li>Youtube</li>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </div>
    <h5>Unsubscribe|Subscribe</h5>
    
    </body>
   </html>`;

  return {
    to: lineManager.email,
    from: process.env.SENDER_EMAIL,
    subject: 'New Request to travel',
    text: `${user.name} has requested to travel`,
    html: template
  };
};

export default email;
