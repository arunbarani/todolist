# Todolist

<h4>Want to see how it looks before setup and run it in local. Click <a href="https://todolist-ooyala-challange.appspot.com/" target="_blank">HERE</a> to access the todo-list which is deployed in Google Cloud.</h4>

<h3>Local setup</h3>

<ul>
  <li> Clone or download <a href="https://github.com/arunbarani/todolist-ooyala-challange.git">todolist-ooyala-challange.</a> </li>
  <li> Navigate to todolist-ooyala-challange in CMD. </li>
  <li> Run following npm commands. It will install all the dependency node modules.</li>
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
  <li> Open <a href="http://localhost:8080">localhost:8080</a> in web browser </li>
</ul>

<h3>Test application</h3>
<ul>
  <li> Run following npm commands to run the unit test</li>
  <ul>
    <li> npm test </li>
  </ul>
  <li> Following unit tests are coverd with <a href="https://github.com/facebook/jest">jest</a> testing framework </li>
   <ul>
    <li> Actions test </li>
    <li> Reducers test </li>
    <li> Snapshot test </li>
  </ul>
</ul>

<h3> Configure application </h3>
  <h6>Todo list application uses two types of data source </h6>
<ol>
<li>Json File</li>
<li>Mongo DB </li>
</ol>
<p>By default its set to JsonFile.</p>


