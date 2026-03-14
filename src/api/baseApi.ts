const api = import.meta.env.VITE_API_BASE_URL;

export interface ApiResponse<T> {
  data: T | null;
  ok: boolean;
  status: number;
}

async function apiFetch<T>(
	url: string, 
	options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(
		api + url, 
		{	
			headers: {
				"Content-Type": "application/json"
			},
			...options 
		}
	);

  if (!response.ok) 
		return { 
			data: null, 
			ok: false, 
			status: response.status 
		};

  const data: T = await response.json();
  return { 
		data, 
		ok: true, 
		status: response.status 
	};
}

export default apiFetch;