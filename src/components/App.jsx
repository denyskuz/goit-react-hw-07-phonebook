import React from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import classes from "./App.module.css"
import Filter from "./Filter";


export const App = () => {
  return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
            <h1 className={classes.title}>PhoneBook</h1>
            <ContactForm />
        </div>
        <div className={classes.container}>
          <h2 className={classes.title}>Contacts</h2>
          <Filter />
          <ContactList />
        </div>
      </div>
  )
}
