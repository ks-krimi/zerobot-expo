export const validateLogin = (values) => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Mot de passe est vide'
  } else if (values.password.trim() === '') {
    errors.password = "Espace n'est pas authorisé"
  } else if (values.password.length < 4) {
    errors.password = 'Au moin 04 caractères'
  }

  if (!values.username) {
    errors.username = 'Email est vide'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = 'Email invalide'
  }

  return errors
}
