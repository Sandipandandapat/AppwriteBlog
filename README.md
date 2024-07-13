1. npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
2. we have to set up environment variable
    for this in root we have to create .env
    (Environment variables in React are crucial for managing sensitive data and configuring your application for different environments, such as development, staging, and production. They allow you to store data like API keys outside of your codebase, enhancing the security of your application.)
    ** we never ship environment variable to production
3. It is a good practice that to get the env variables we should create a config for that
4. If we make email input and password input two seperate component and want to incorporate in a child input component,
    then we have to use ForwardRef hook to pass ref of the chaild component to the parent component.
5. we are using react-hook-form in login.jsx
6. 
*** useForm() -> it is used to manage form state,validate and submission with minimal re-rendering
    const [register,handleSubmit,watch,setValue,control,getValues] = useForm()
    register -> this binds the input element to the form-state and make it trackable
    handleSubmit -> it takes a callback with submission logic when the form is submitted
    watch -> used to monitor changes of specified field or the entire form, it return the current value of the sprecified field
    setValue -> used to programatically set the value of specified field
    control -> Provides control over the form state and is often used with controlled components.
    getValues -> It can get values for all fields or a specific field.
7. In react-hook-form, the shouldValidate option is used to control whether a field should be validated when its value is   programmatically set using the setValue function.

8. useParams()
 
