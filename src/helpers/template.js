const template = ({
  firstName, url
}) => `<!DOCTYPE html>
<html>
<head>
<style>
h2 {
                    
  color: #F9A826;
  font-family: Lato;
  font-style:normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 43px;
  
  }
h3 {
  
  color: #728191;
  font-family: Lato;
  font-style:normal;
  font-weight: normal;
  font-size: 14px;
 
  
}
button{

  width: 100px;
  height: 38px;
  left: 529px;
  top: 387px;
  background:#F9A826;
  border-radius: 10px;
  font-family: Lato;
  margin-left:4em;
  
}
button:hover{
  background-color: #728191;
}
#footer{
  margin-top:2em;
  border:#728191 ;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  width: 300px;
}
#footer p{
 
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #728191;
  position: relative;
  padding-left:5em;
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

<h2>Dear ${firstName},</h2>
<h3>Welcome!</h3>
<h3>To the barefoot Nomad Family,</h5>
<h3>Let us take you to your happy place :)</h3>
<a href = "${url}"><button> Verify Email </button></a>
<div id = "footer">
  <p> Barefoot Nomad Kigali-Rwanda, KK 5 Av </p>
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

export default template;
