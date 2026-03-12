import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SigninAlert({ classList }) {
  return <>
    <Alert className={`fixed top-[90px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 ${classList}`}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This action can only be performed after sign in
      </AlertDescription>
    </Alert>
  </>
}
