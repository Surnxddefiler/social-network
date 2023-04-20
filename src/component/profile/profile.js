import Post from "./post";
import style from './profile.module.css'
import React, { useEffect, useState } from 'react';
import Preloader from "../../assets/preloader/preloader";
import { Field, Form } from 'react-final-form';
import { maxLengthCreator, requiredField, composeValidators } from "../../validators/validators";
import StatusHooks from "./statusHooks";

const Profile = (props) => {
  let [editMode, setEditMode] = useState(false)
  let postElements = props.profilePage.postData.map(el => <Post message={el.message} />)
  if (!props.profilePage.profile) {
    return <Preloader />
  }
  const newAvatar = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  const onSubmit = (e) => {
    props.saveProfile(e)
    setEditMode(false)
  }
  return (
    <section className={style.profile}>
      <img className={style.background} src="https://png.pngtree.com/thumb_back/fh260/background/20191215/pngtree-modern-double-colors-neon-lights-on-brick-background-image_324803.jpg"></img>
      <div className={style.profile__info}>
        <div className={style.profile__ava}>
          <img src={props.profilePage.profile.photos.small}></img>
          {props.owner && <input type='file' onChange={newAvatar} />}
        </div>
        <div className={style.profile__data}>
          <div className="profile-name">{props.profilePage.profile.fullName}</div>
          <div className="profile-status">status:  <StatusHooks status={props.status} updateStatusThunk={props.updateStatusThunk} /> </div>
          {editMode ? <ProfileInfoForm profile={props.profilePage.profile} onSubmit={onSubmit} saveProfile={props.saveProfileThunk} /> : <ProfileInfo profile={props.profilePage.profile} owner={props.owner} setEditMode={() => { setEditMode(true) }} />}
        </div>
      </div>
      <div className={style.post}>
        <h2 className="post-title">My posts</h2>
        <Form onSubmit={(obj) => { props.addPost(obj.chatInput) }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field validate={composeValidators(requiredField, maxLengthCreator(5))} name='chatInput'>
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="post" {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <button className={style.post__button}>post</button>
            </form>
          )
          }
        </Form>
        {/* <input onChange={changeInput} type="text" className="input" ref={postInput} value={props.profilePage.postInput}/>
        <button onClick={addPost}  className={style.post__button}>post</button> */}
      </div>
      {postElements}

    </section>
  )
}
const ProfileInfo = ({ owner, profile, setEditMode }) => {
  return (
    <div>
      {owner && <button onClick={setEditMode}>edit</button>}
      <div>{profile.aboutMe}</div>
      <div>looking for a job: {profile.lookingForAJob ? "da" : 'net'}</div>
      <div> Contact: {Object.keys(profile.contacts).map(key => {
        return <Contact contact={key} value={profile.contacts[key]} />
      })}</div>
    </div>
  )
}
const ProfileInfoForm = (props) => {

  return (
    <Form initialValues={props.profile} onSubmit={(obj) => { props.onSubmit(obj) }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <span>fullName</span>
          <Field name="fullName" component="input" type="text" />
          <span>status</span>
          <Field name="aboutMe" component="input" type="text" />
          <span>looking For A Job</span>
          <Field name="lookingForAJob" component="input" type="checkbox" />
          <span>job descr</span>
          <Field name="lookingForAJobDescription" component="input" type="text" />
          <button className={style.post__button}>save</button>
          <div> Contact: {Object.keys(props.profile.contacts).map(key => {
            return <div> {key}  <Field name={"contacts."+key} component="input" type="text" /> </div>
          })}</div>
        </form>
      )
      }
    </Form>
  )
}
const Contact = ({ contact, value }) => {
  return <div>{contact}:{value}</div>
}
export default Profile;