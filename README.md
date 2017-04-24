# Todolist

<h4>Want to see how it looks before setup and run it in local, click <a href="https://todolist-ooyala-challenge.appspot.com/" target="_blank">here</a>.</h4>

<h3>Setup</h3>
<ul>
  <li> Clone or download <a href="https://github.com/arunbarani/todolist-ooyala-challenge.git">todolist-ooyala-challenge.</a> </li>
  <li> Navigate to todolist-ooyala-challenge in CMD. </li>
  <li> Run following npm commands. It will install all the dependency node modules.</li>
  <ul>
      <li>npm install</li>
      <li>npm install -g webpack</li>
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
<h5> Configure to Mongo DB in <a href="https://github.com/arunbarani/todolist-ooyala-challenge/blob/master/server/config.json">server/config.json</a></h5>
<ul>
<li> Change <b>dataSource</b> to <b>mongodb</b> </li>
<li> Create db called <b>TodoDB</b> or create your own db and configure it in <b>db</b> property</li>
<li> Create collection called <b>counters</b>. This is to create auto increment field. By default <a href="https://docs.mongodb.com/v3.0/tutorial/create-an-auto-incrementing-field/"> mongodb doesn't support auto increment field </a>
<li> Insert below document in to <b>counters</b> collection.</li>
<li><ul>
<li><pre>({ "_id" : "todo", "todoId" : 0 })</pre></li>
</ul></li>
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
          "connectionStr": "mongodb://localhost:27017",
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
