import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import rndColor from "randomcolor"

import addMonths from "date-fns/addMonths"
import addWeeks from "date-fns/addWeeks"
import addDays from "date-fns/addDays"
import startOfMonth from "date-fns/startOfMonth"
import startOfWeek from "date-fns/startOfWeek"
import startOfDay from "date-fns/startOfDay"

import Layout from "../components/layout"

import { useFirebase } from "../contexts/firebaseContext"
import { navigate } from "gatsby"

const Settings = ({ location, tasks = [] }) => {
  const { firebase, user } = useFirebase()
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = ({ title, period, begin }) => {
    const randomColor = rndColor()

    let nextInit

    if (period === "monthly") {
      nextInit = startOfMonth(addMonths(new Date(), 1))
    } else if (period === "daily") {
      nextInit = startOfDay(addDays(new Date(), 1))
    } else if (period === "weekly") {
      nextInit = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })
    }

    firebase.db.collection("checkers").add({
      created: new Date(),
      user: firebase.db.doc(`users/${user.uid}`),
      color: randomColor,
      nextInit,
      title,
      begin,
      period,
      tasks,
    })

    navigate("/home")
  }

  return (
    <Layout page="new">
      <H1>Paramètres du checker</H1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Group>
          <Label htmlFor="title">Titre du checker:</Label>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            ref={register({ required: true })}
          />
        </Group>

        <Group>
          <Label htmlFor="period">Périodicité:</Label>
          <select name="period" ref={register({ required: true })}>
            <option value="daily">Quotidien</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuel</option>
          </select>
        </Group>

        <Group>
          <Label htmlFor="begin">Début:</Label>
          <input type="date" lang="fr-FR" name="begin" ref={register} />
        </Group>
        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <input type="submit" value="Enregistrer" />
      </Form>
    </Layout>
  )
}

Settings.propTypes = {
  location: PropTypes.object.isRequired,
  tasks: PropTypes.array,
}

export default Settings

const H1 = styled.h1`
  height: 20%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  padding: 0 0.3em;
`
