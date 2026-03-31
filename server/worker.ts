import { renderPage } from 'vike/server'

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const pageContextInit = {
      urlOriginal: request.url,
      // You can add more context here, like env or user info
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) {
      return new Response(null, { status: 404 })
    } else {
      const { body, statusCode, headers } = httpResponse
      return new Response(body, {
        headers,
        status: statusCode
      })
    }
  }
}
