import React from "react"

import Layout from "../components/layout"
import Checker from "../components/Checker"
import { useCheckers } from "../contexts/checkerContext"

const CheckerPage = () => {
  const { currentChecker } = useCheckers()
  return (
    <Layout page="checker">
      <Checker checker={currentChecker} />
    </Layout>
  )
}

export default CheckerPage
