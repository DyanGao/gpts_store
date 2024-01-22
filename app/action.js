import supabase from '@/app/config/supabaseClient'

const fetchCards = async (page=1, pageSize=21) => {
  try {
    const { data, error } = await supabase
      .from('gpts_list_all')
      .select()
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize)
    // console.log(page)
    //  console.log(data)
      
    if (data) {
      return { success: true, data };
    }

    if (error) {
      return { success: false, error: 'Could not fetch the stores' };
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return { success: false, error: 'An error occurred while fetching data' };
  }
};

export {fetchCards}