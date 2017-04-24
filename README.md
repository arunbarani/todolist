# Todolist

<h4>Want to see how it looks before setup and run it in local, click <a href="https://todolist-ooyala-challange.appspot.com/" target="_blank">HERE</a>.</h4>

<h3>Setup</h3>
<ul>
  <li> Clone or download <a href="https://github.com/arunbarani/todolist-ooyala-challange.git">todolist-ooyala-challange.</a> </li>
  <li> Navigate to todolist-ooyala-challange in CMD. </li>
  <li> Run following npm commands. It will install all the dependency node modules.</li>
  <ul>
      <li>npm install.</li>
      <li>npm install webpack.</li>
  </ul>
</ul>

<h3>Run</h3>
<ul>
  <li> Run following npm commands to run the application</li>
  <ul>
    <li> webpack --config webpack.config.js </li>
    <li> node start </li>
  </ul>
  <li> Open <a href="http://localhost:8080">localhost:8080</a> in web browser </li>
</ul>

<h3>Test</h3>
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

<h3> Configure</h3>
  <h6>Todo list application uses two types of data source </h6>
<ol>
<li>Json File</li>
<li>Mongo DB </li>
</ol>
<p>By default its set to Json File.</p>
<h5> Configure to Mongo DB </h5>
<ul>
<li> Install <a href="https://docs.mongodb.com/manual/administration/install-community/">MongoDB</a> </li>
<li> <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition">Setup and run</a> MongoDB </li>
<li> Create db called <b>TodoDB</b> or create your own db and configure it in <b>db</b> property of <b>server/config.json</b> </li>
<li> Change dataSource to mongodb </li>
<li> Run application</li>
</ul>

<h5>config.json</h5>
<pre>
   {
     "__comment__": "dataSource : [jsonfile / mongodb]",

      "dataSource": "jsonfile",
      "fileConfig": {
          "fileURL": "server/data.json"
      },
      "dbConfig": {
          "host": "localhost",
          "port": "27017",
          "db": "TodoDB"
      }
    }
</pre>

<h5>Libraries used</h5>
<ul>
<li> React </li>
<li> Redux </li>
<li> bootstrap </li>
<li> react-bootstrap</li>
<li> Webpack </li>
<li> jest </li>
<li> NodeJS </li>
<li> Express</li>
<li> MongoDB </li>
</ul>
