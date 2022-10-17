import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import classes from "./App.module.css"
import Filter from "./Filter";
import {
  useAddContactMutation,
  useGetContactsQuery,
  useDeleteContactMutation
} from '../redux/contacts/slice';


export const App = () => {
  const [filter, setFilter] = useState('');
  const [addContact, { isLoading }] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const { data: contacts, loading } = useGetContactsQuery();

  const handleSubmit = async values => {
    const { name, number } = values;
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts !!!`);
      return;
    }
     await addContact({ name, number });
  };

  const handlerDelete = contactId => {
      deleteContact(contactId);
  };

  const handleFilter = value => {
        setFilter(value)
  };

  const filterContacts = contacts && contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
            <h1 className={classes.title}>PhoneBook</h1>
        <ContactForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div className={classes.container}>
          <h2 className={classes.title}>Contacts</h2>
          <Filter onHandleFilter={handleFilter} />
        {loading &&
           <div className={classes.loader}>
              <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
                <path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                </path>
              </svg>
          </div>
        }
        
        {!loading &&
          <ContactList
            contacts={filterContacts}
            onDelete={handlerDelete}
          />
        }
        
          
        </div>
      </div>
  )
}
