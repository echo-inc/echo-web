import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

function App() {
    const [showForm, setshowForm] = useState(true)
    const [requestStatus, setRequestStatus] = useState(null)
    const validate = (values, props) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

  return (
      <div>
          <div className="mb-2 orange-text">{requestStatus}</div>

          <Formik
        initialValues={{
            email: '',
        }}
        validate={validate}
        onSubmit={async (values) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };
             fetch('https://api.joinecho.app/invitation_requests', requestOptions)
                .then(response => response.json())
                .then(data => setRequestStatus(data.status))
                .then(() => setshowForm(false))
                .catch((error) => {
                    console.log('error: ' + error);
                    setRequestStatus(error);
                });;
        }}
    >
        {(formik) => (
        showForm && (<Form>
            {formik.errors.email && <div className="mb-2 orange-text">{formik.errors.email}</div>}

            <Field
                id="email"
                name="email"
                placeholder="youremail@example.com"
                type="email"
                className="email-field"
            />
            <button type="submit" className="button mx-2">Submit</button>
        </Form>)
            )}
    </Formik>
      </div>
  );
}

export default App;
