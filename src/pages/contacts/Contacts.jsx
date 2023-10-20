import Title from "../../components/title/Title";
import ContactTable from "./ContactTable";

const Contact = () => {
  return (
    <div>
      <div className="contact">
        <Title title="Contacts" />
        <div className="content">
          <ContactTable />
        </div>
      </div>
    </div>
  );
};

export default Contact;
