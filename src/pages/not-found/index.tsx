import * as React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div>
    <div>
      <span>We can found nothing :(</span>
      <br />
      <Link to="/">
        <span>Go to the main page</span>
      </Link>
    </div>
  </div>
)

export default NotFound
