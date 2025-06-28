import DeveloperDetailsWrapper from "@/components/developer/developer-details"

function DeveloperDetails(params: { params: { id: string } }) {
  const { id } = params.params
  return (
    <div>
      <DeveloperDetailsWrapper id={id} />
    </div>
  )
}

export default DeveloperDetails
