"use client"

export default function Search() {
    function search(formData: { get: (arg0: string) => any; }) {
      const query = formData.get("query");
      alert(`You searched for '${query}'`);
    }
    return (
      <form action={search}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
    );
  }

export const CreateProject = () => {
    function submit(formData: { get: (arg0: string) => any; }) {
        const query = formData.get("query");
        alert(`You added '${query}'`);
        //add project to database and update cache
    }



    return <form action={submit} className="justify-center whitespace-nowrap">
        <input type="text" className="focus:outline-none w-full text-xs font-medium  px-5 py-2 rounded-md border-primary-100 border-[2px]" id="create-project" placeholder="Type here to create..." />
     </form>
}
  