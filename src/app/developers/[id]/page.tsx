import DeveloperAddUpdateForm from "@/components/developer/addupdate"

function DevelopersDetails() {
  return (
    <div>
      <h1>Developers details page</h1>
      <DeveloperAddUpdateForm onSuccess={() => window.location.href = '/developers'} />
    </div>
  )
}

export default DevelopersDetails
