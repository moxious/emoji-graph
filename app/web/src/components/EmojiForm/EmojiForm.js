import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/web'

const CSS = {
  label: 'block mt-6 text-gray-700 font-semibold',
  labelError: 'block mt-6 font-semibold text-red-700',
  input:
    'block mt-2 w-full p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:border-gray-500',
  inputError:
    'block mt-2 w-full p-2 border border-red-700 text-red-900 rounded focus:outline-none',
  errorMessage: 'block mt-1 font-semibold uppercase text-xs text-red-700',
}

const EmojiForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.emoji?.id)
  }

  return (
    <div className="box-border text-sm -mt-4">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="p-4 bg-red-100 text-red-700 border border-red-300 rounded mt-4 mb-4"
          titleClassName="mt-0 font-semibold"
          listClassName="mt-2 list-disc list-inside"
        />

        {/* <Label
          name="column_a"
          className={CSS.label}
          errorClassName={CSS.labelError}
        />
        <TextField
          name="column_a"
          defaultValue={props.emoji?.column_a}
          className={CSS.input}
          errorClassName={CSS.inputError}
          validation={{ required: true }}
        />
        <FieldError name="column_a" className={CSS.errorMessage} /> */}

        <Label
          name="code"
          className={CSS.label}
          errorClassName={CSS.labelError}
        />
        <TextField
          name="code"
          defaultValue={props.emoji?.code}
          className={CSS.input}
          errorClassName={CSS.inputError}
          validation={{ required: true }}
        />
        <FieldError name="code" className={CSS.errorMessage} />

        <Label
          name="browser"
          className={CSS.label}
          errorClassName={CSS.labelError}
        />
        <TextField
          name="browser"
          defaultValue={props.emoji?.browser}
          className={CSS.input}
          errorClassName={CSS.inputError}
          validation={{ required: true }}
        />
        <FieldError name="browser" className={CSS.errorMessage} />

        <Label
          name="name"
          className={CSS.label}
          errorClassName={CSS.labelError}
        />
        <TextField
          name="name"
          defaultValue={props.emoji?.name}
          className={CSS.input}
          errorClassName={CSS.inputError}
          validation={{ required: true }}
        />
        <FieldError name="name" className={CSS.errorMessage} />

        <Label
          name="category"
          className={CSS.label}
          errorClassName={CSS.labelError}
        />
        <TextField
          name="category"
          defaultValue={props.emoji?.category}
          className={CSS.input}
          errorClassName={CSS.inputError}
          validation={{ required: true }}
        />
        <FieldError name="category" className={CSS.errorMessage} />

        <div className="mt-8 text-center">
          <Submit
            disabled={props.loading}
            className="bg-blue-600 text-white hover:bg-blue-700 text-xs rounded px-4 py-2 uppercase font-semibold tracking-wide"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EmojiForm
