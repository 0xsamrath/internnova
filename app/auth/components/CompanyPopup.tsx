import Form from "../../core/components/Form"
import { Company } from "../validations"
import { LabeledTextField } from "../../core/components/LabeledTextField"
import LabeledTextArea from "../../core/components/LabeledTextArea"
import { Popup } from "../../core/components/Popup"
import { UploadAvatar } from "app/core/components/UploadAvatar"
import { useMutation } from "blitz"
import companySignup from "../mutations/company-signup"
import { SignUpValues } from "./SignupForm"
import sendConfirmationEmail from "../mutations/sendConfirmationEmail"

export const CompanyPopup = ({ general }: { general: SignUpValues }) => {
  const [companyMutation] = useMutation(companySignup)
  const [sendConfirmationMutation] = useMutation(sendConfirmationEmail)
  return (
    <Popup title="Create account" scroll={false}>
      <Form
        schema={Company}
        options=""
        submitText="Next"
        initialValues={{ description: "", website: "", username: "" }}
        onSubmit={async (values) => {
          await companyMutation({ ...general, ...values })
          await sendConfirmationMutation(general.role)
        }}
      >
        <div className="grid place-items-center pb-4 w-full">
          <UploadAvatar />
        </div>
        <LabeledTextField name="username" placeholder="Unique username for your company" />
        <LabeledTextArea name="description" placeholder="Description" />
        <LabeledTextField name="website" placeholder="Website" />
      </Form>
    </Popup>
  )
}
