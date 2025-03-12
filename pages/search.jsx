import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdvancedSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { 
      byTitle: false,
      byTags: false,
      isOnView: false,
      isHighlight: false
    }
  })
  const router = useRouter()

  const submitForm = (data) => {
    // let queryString = ``;
    // if (data.byTitle) queryString += "title=true";
    // if (data.byTags) queryString += "tags=true";
    // queryString += `${data.geoLocation && `&geoLocation=${data.geoLocation}`}${data.medium && `&medium=${data.medium}`}${data.isOnView && "&isOnView=true"}${data.isHighlight && "&isHighlight=true"}&q=${data.q}`;
    let queryString = [];
    if (data.byTitle) queryString.push("title=true");
    if (data.byTags) queryString.push("tags=true");
    if (data.geoLocation) queryString.push(`geoLocation=${data.geoLocation}`);
    if (data.medium) queryString.push(`medium=${data.medium}`);
    if (data.isOnView) queryString.push("isOnView=true");
    if (data.isHighlight) queryString.push("isHighlight=true");
    queryString.push(`q=${data.q}`);

    queryString = queryString.join("&");
    
    router.push(`/artwork?${queryString}`)
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-gray-700">
      <h2 className="text-2xl font-bold text-center mb-4">Advanced Artwork Search</h2>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        
        <div>
          <label className="block text-gray-700 font-medium">Search Query</label>
          <Input
            {...register("q", { required: "Please enter search query" })}
            placeholder="Enter search keywords"
            className={errors.q ? "border-red-500" : ""}
          />
          {errors.q && <p className="text-red-500 text-sm">{errors.q.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Search By</label>
          <div className="flex gap-5 text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" {...register("byTitle")} />
              Title
            </label>

            <label className="flex gap-2">
              <input type="checkbox" {...register("byTags")} />
              Tags
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Geo Location</label>
          <Input {...register("geoLocation")} placeholder="Enter country or city" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Medium</label>
          <Input {...register("medium")} placeholder="Enter medium" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">On View</label>
          <input type="checkbox" {...register("isOnView")} />
          {/* <Select {...register("isOnView")} defaultValue="false">
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Highlight</label>
          <input type="checkbox" {...register("isHighlight")} />
          {/* <Select {...register("isHighlight")} defaultValue="false">
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <Button type="submit" className="w-full">Search</Button>
      </form>
    </div>
  )
}
