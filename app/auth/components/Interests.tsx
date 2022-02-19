import { useState } from "react"
import { Popup } from "../../core/components/Popup"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { Button } from "../../core/components/Button"
import { ErrorLabel } from "../../core/components/ErrorLabel"
import { useMutation } from "blitz"
import internSignup from "../mutations/intern-signup"
import { SignUpValues } from "./SignupForm"
import { InternValues } from "../pages/signup"
import sendConfirmationEmail from "../mutations/sendConfirmationEmail"

export const Interests = ({
  goBack,
  internValues,
}: {
  goBack(): void
  internValues: SignUpValues & InternValues
}) => {
  const [interests, setInterests] = useState<string[]>([])
  const [internMutation] = useMutation(internSignup)
  const [sendConfirmationMutation] = useMutation(sendConfirmationEmail)
  const fields = [
    "Web development",
    "AI/ML",
    "Systems",
    "Game development",
    "Startups",
    "Robotics/IoT",
    "Trading",
  ]

  const isSelected = (value) => interests.find((v) => v === value)

  const handleInterestSelect = (value: string) => {
    if (value === "") {
      return
    } else if (isSelected(value)) {
      setInterests(interests.filter((v) => v !== value))
    } else {
      setInterests([...interests, value])
    }
  }

  return (
    <Popup title="Your interests" step={2} scroll={true}>
      <div className="flex flex-col gap-5 py-10 px-8 mb-4">
        <span className="text-neutral-800">
          Which field do you specialize in? Which field interests you?
        </span>
        <div className="flex flex-col gap-5 pt-4 cursor-pointer w-[80vw] sm:w-[50vw] lg:w-[35vw] xl:w-[28vw]">
          {fields.map((field) => {
            const selected = isSelected(field)
            return (
              <div
                className="flex justify-between items-center p-5 w-full bg-white rounded-lg"
                style={{ border: `1px solid ${selected ? "#5c6cff" : "#e6e6e6"}` }}
                key={field}
                onClick={() => handleInterestSelect(field)}
              >
                <span>{field}</span>
                {selected && <BsFillCheckCircleFill color="#5c6cff" />}
              </div>
            )
          })}
        </div>
        {interests.length === 0 && <ErrorLabel error="Select at least one interest to continue" />}
        <div className="flex gap-4 items-center w-full">
          <Button
            options="w-1/2"
            onClick={async () => {
              await internMutation({ ...internValues, interests })
              await sendConfirmationMutation(internValues.role)
            }}
            {...{ disabled: interests.length === 0 }}
          >
            Next
          </Button>
          <Button options="w-1/2" onClick={goBack}>
            Back
          </Button>
        </div>
      </div>
    </Popup>
  )
}
