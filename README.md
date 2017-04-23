# Todolist ooyala challange

<h4>Want to see how it looks before setup and run it in local. Click <a href="https://todolist-ooyala-challange.appspot.com/" target="_blank">HERE</a> to access the todo-list which is deployed in Google Cloud.</h4>

<h3>Local setup</h3>

<ul>
  <li> Clone or download todolist-ooyala-challange. </li>
  <li> Navigate to todolist-ooyala-challange in CMD. </li>
  <li> Run following npm commands. It will install all the dependent node modules.</li>
  <ul>
      <li>npm install.</li>
      <li>npm install webpack.</li>
  </ul>
</ul>

<h3>Run application</h3>
<ul>
  <li> Run following npm commands to run the application</li>
  <ul>
    <li> webpack --config webpack.config.js </li>
    <li> node start </li>
  </ul>
  <li> Open localhost:8080 in web browser </li>
</ul>

<h3>Test application</h3>
<ul>
  <li> Run following npm commands to run the unit test</li>
  <ul>
    <li> npm test </li>
  </ul>
  <li> Following unit tests are coverd with jest testing framework </li>
   <ul>
    <li> Actions test </li>
    <li> Reducers test </li>
    <li> Snapshot test </li>
  </ul>
</ul>



