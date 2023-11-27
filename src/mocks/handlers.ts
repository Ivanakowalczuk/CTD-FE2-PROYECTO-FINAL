import {rest} from 'msw'
import { API_URL } from '../app/constants'
import { allResults, results } from './dataMocks'

export const handlers = [
    rest.get(API_URL, (req, res, ctx)=>{
        const data = req.url.searchParams.get('character') ? results : allResults
       console.log('desde msw', data)
        return res(
            ctx.status(200),
            ctx.json({
              results: data
            })
        )
    })
]