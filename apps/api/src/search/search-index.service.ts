import {
  Injectable,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma/prisma.service';


@Injectable()

export class SearchIndexService {


  constructor(
    private readonly prisma: PrismaService,
  ){}



  async index(data:{
    entityType:string;
    entityId:string;
    organizationId?:string;
    title:string;
    description?:string;
    visibility:'GLOBAL'|'ORG';
    metadata?:Record<string,any>;
  }){


    return this.prisma.$executeRaw`

      INSERT INTO "SearchIndex"
      (
        id,
        "entityType",
        "entityId",
        "organizationId",
        title,
        description,
        visibility,
        metadata
      )

      VALUES
      (
        ${crypto.randomUUID()},
        ${data.entityType},
        ${data.entityId},
        ${data.organizationId ?? null},
        ${data.title},
        ${data.description ?? null},
        ${data.visibility},
        ${JSON.stringify(data.metadata ?? {})}::jsonb
      )

      ON CONFLICT ("entityType","entityId")
      DO UPDATE SET

      title = EXCLUDED.title,
      description = EXCLUDED.description,
      metadata = EXCLUDED.metadata;

    `;


  }



}
