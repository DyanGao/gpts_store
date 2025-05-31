'use server'

import supabase from '@/app/config/supabaseClient'

const fetchCards = async (page=1, pageSize=21) => {
  try {
    const { data, error } = await supabase
      .from('gpts_list_all')
      .select()
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize)
      
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

// New function for pagination with total count
const fetchCardsWithPagination = async (page = 1, pageSize = 21) => {
  try {
    // Check if supabase client is properly initialized
    if (!supabase) {
      return { success: false, error: 'Database connection not available' }
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from('gpts_list_all')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      return { success: false, error: 'Could not fetch count' };
    }

    // Get paginated data
    const { data, error } = await supabase
      .from('gpts_list_all')
      .select()
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize);

    if (error) {
      return { success: false, error: 'Could not fetch the stores' };
    }

    const totalPages = Math.ceil(count / pageSize);

    return { 
      success: true, 
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        pageSize,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return { success: false, error: 'An error occurred while fetching data' };
  }
};

// New function for paginated search results
const searchGPTsWithPagination = async (searchTerm, page = 1, pageSize = 20) => {
  try {
    // Get total count for search
    const { count, error: countError } = await supabase
      .from('gpts_list_all')
      .select('*', { count: 'exact', head: true })
      .textSearch('Name', searchTerm, {
        type: 'websearch',
        config: 'english'
      });

    if (countError) {
      return { success: false, error: 'Could not fetch search count' };
    }

    // Get paginated search results
    const { data, error } = await supabase
      .from('gpts_list_all')
      .select('*')
      .textSearch('Name', searchTerm, {
        type: 'websearch',
        config: 'english'
      })
      .range((page - 1) * pageSize, page * pageSize - 1)
      .limit(pageSize);

    if (error) {
      return { success: false, error: 'Error fetching search results' };
    }

    const totalPages = Math.ceil(count / pageSize);

    return {
      success: true,
      data: data || [],
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        pageSize,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    console.error('An error occurred while searching:', error);
    return { success: false, error: 'An error occurred while searching' };
  }
};

export { fetchCards, fetchCardsWithPagination, searchGPTsWithPagination }