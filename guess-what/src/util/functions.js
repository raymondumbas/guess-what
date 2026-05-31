import supabase from '../config/supabase-config';


/**
 * Wrapper for getting data from supabase
 *
 * @function getData
 * @param {string} from - DB Table name
 * @param {string} select - Desired table field name
 * @param {object} eq - "field" = table field name, "value" = target value
 * @returns {Promise<object>} Resolves to the retrieved DB data
 * @throws {Error} Throws an error if supabase fetch fails
 * 
 */
export async function getData(from, select, eq) {
     
    const { data, error } = await supabase
                .from(from)
                .select(select)
                .eq(eq.field,eq.value)
                
                if(error){

                   throw error;

                }

                else{

                    console.log(`Fetched data from ${from}`,data);
                    return data;

                }

}



/**
 * Wrapper for inserting into supabase
 *
 * @function insertData
 * @param {string} from - DB Table name
 * @param {object} dataObject - Key = table fields, Value = field values
 * @returns {Promise<object>} Resolves to the retrieved DB data
 * @throws {Error} Throws an error if supabase fetch fails
 * 
 */
export async function insertData(from,dataObject){

            const { data, error } = await supabase.from(from).insert(dataObject)

        if(error){

          throw error;

        }

        else{

          console.log(`Inserted data to ${from}`,data);

        }

}