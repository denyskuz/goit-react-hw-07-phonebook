import React from 'react'
import { arrayOf, shape, string, number, func } from 'prop-types';
import classes from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useGetContactsQuery, useDeleteContactMutation } from 'redux/contacts/slice';

const ContactList = () => {
    const filter = useSelector(state => state.filter.filter);
    const [deleteContact] = useDeleteContactMutation();
    const { data: contacts, loading } = useGetContactsQuery();
    const filterContacts = contacts && contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <>
         { loading &&
           <div className={classes.loader}>
              <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
                <path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                </path>
              </svg>
          </div>
        }
        {!loading && <ul className={classes.items}>
            {filterContacts && filterContacts.map(({ name, number, id }) => (
                <li
                    key={id}
                    className={classes.item}
                >
                    {`${name}: ${number}`}
                    <button
                        className={classes.deleteBtn}
                        type="button"
                        onClick={() => deleteContact(id)}
                        title="Delete"
                    >
                        &#10006;
                    </button>
                </li>
            ))}
        </ul>
        }
        </>
    )
}
ContactList.propsTypes = {
    contacts: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired,
        number: number.isRequired
    })).isRequired,
    onDelete: func.isRequired
}
export default ContactList;