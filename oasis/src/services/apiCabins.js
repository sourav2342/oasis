import { useQueryClient } from "@tanstack/react-query";
import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {
    
 const { data , error } = await supabase
.from('cabins')
.select('*');

if(error){
    console.log(error);
    throw new Error("cabins could not be loaded");
}

    return data;
}

export async function createEditCabin(newCabin, id) {

   // const queryClient  = useQueryClient();
   // console.log(newCabin.image);

   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
   //console.log(hasImagePath);
    //https://barwtzwekcsurjbeplef.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

     const imageName = `${newCabin.image.name}`.replaceAll("/","");

     
     const imagePath = hasImagePath ? newCabin.image:  `${supabaseUrl}/storage/v1/
     object/public/cabin-images/${imageName}`;
    
    // console.log(imagePath);

     let query = supabase.from('cabins');

    if(!id)
    query = query.insert([{...newCabin, image: imagePath }]);
    

    if(id)
       query = query.update({...newCabin, image: imagePath }).eq('id', id);
    

    const { data, error } = await query.select().single();

    if(error) {
        console.log(error);
        throw new Error("Cabin could not be created");
    }

    
    // //upload image

    if(hasImagePath) return data;

    const { error:storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(`${Math.random()}-${imageName}`, newCabin.image, {
        cacheControl: '3600',
        upsert: false
    })
    // const {  error: storageError } = await supabase.storage
    //  .from('cabin-images')
    //  .upload(imageName, newCabin.image);

    //queryClient.invalidateQueries({queryKey: ["cabins"]});
    // // delete the cabin if there was an error uploading image

    if(storageError) {
        console.log("not added");
    }

    return data;
}

export async function deleteCabin(id) {
    
    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

    if(error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}