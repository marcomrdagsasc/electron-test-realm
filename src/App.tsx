import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Realm from "realm";

function App() {

  useEffect(() => {
    (async () => {
      const app = new Realm.App({ id: "poc-kuskk" });
      const user = await app.logIn(Realm.Credentials.anonymous());
      const DogSchema = {
        name: "Dog",
        properties: {
          _id: 'int',
          name: "string",
          age: "int",
        },
        primaryKey: '_id'
      };
      const realm = await Realm.open({
        schema: [DogSchema],
        sync: {
          user: user,
          flexible: true,
        },
      });
      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      const submissions = await mongodb?.db("Cruzadas").collection("submissions").find();
      console.log("submissions", submissions);

    })()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
