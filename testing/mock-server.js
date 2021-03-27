import { rest } from 'msw'
import { setupServer} from 'msw/node'

const mock_endpoints = {
    '/addresses/:postcode' : {success: {"latitude":51.487111,"longitude":-0.088692,"addresses":["139 Merrow Street, , , , , London, ","141 Merrow Street, , , , , London, ","143 Merrow Street, , , , , London, ","145 Merrow Street, , , , , London, ","147 Merrow Street, , , , , London, ","149 Merrow Street, , , , , London, ","151 Merrow Street, , , , , London, ","153 Merrow Street, , , , , London, ","155 Merrow Street, , , , , London, ","157 Merrow Street, , , , , London, ","159 Merrow Street, , , , , London, ","161 Merrow Street, , , , , London, ","163 Merrow Street, , , , , London, ","165 Merrow Street, , , , , London, ","167 Merrow Street, , , , , London, ","169 Merrow Street, , , , , London, ","171 Merrow Street, , , , , London, ","173 Merrow Street, , , , , London, ","175 Merrow Street, , , , , London, ","177 Merrow Street, , , , , London, ","179 Merrow Street, , , , , London, ","181 Merrow Street, , , , , London, ","183 Merrow Street, , , , , London, ","185 Merrow Street, , , , , London, ","187 Merrow Street, , , , , London, ","189 Merrow Street, , , , , London, ","191 Merrow Street, , , , , London, ","193 Merrow Street, , , , , London, ","195 Merrow Street, , , , , London, ","197 Merrow Street, , , , , London, ","199 Merrow Street, , , , , London, ","201 Merrow Street, , , , , London, ","203 Merrow Street, , , , , London, "]}}
}

const server = setupServer(
  rest.get(process.env.REACT_APP_SERVER_URL + '/addresses/:postcode', (req, res, ctx) => {
    return res(ctx.json(mock_endpoints['/addresses/:postcode']))
  }),
)

export default server
