import DashNav from "./components/DashNav"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
})

{
    return(
    <section className="px-4 lg:px-24">
    <DashNav/>
        {children}
    </section>
    )
  }