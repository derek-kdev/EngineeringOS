import {
  Injectable,
} from "@nestjs/common";


import {
  PrismaService,
} from "../prisma/prisma.service";



@Injectable()

export class SearchService {


  constructor(

    private readonly prisma:PrismaService,

  ){}





  async search(

    query:string,

    organizationIds:string[],

  ){


    return this.prisma.$queryRaw`

      SELECT

        id,

        "entityType",

        "entityId",

        title,

        description,

        visibility,

        metadata,


        ts_rank(

          search_vector,

          plainto_tsquery('english', ${query})

        ) AS rank


      FROM "SearchIndex"


      WHERE

      search_vector @@ plainto_tsquery(
        'english',
        ${query}
      )


      AND

      (

        visibility = 'GLOBAL'


        OR


        (

          visibility = 'ORG'

          AND

          "organizationId" IN (${organizationIds})

        )

      )


      ORDER BY rank DESC

      LIMIT 50;


    `;


  }


}
