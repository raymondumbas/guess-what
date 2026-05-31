import supabase from './config/supabase-config';

export async function getData(from, select, eq) {
     
    const { data, error } = await supabase
                .from(from)
                .select(select)
                .eq(eq.field,eq.value)
                
                if(error){

                   console.log(error);
                   throw error;

                }

                else{

                    return data;

                }

}