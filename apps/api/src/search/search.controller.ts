import {
  Controller,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";


import {
  SearchService,
} from "./search.service";


import {
  SearchQueryDto,
} from "./dto/search-query.dto";


import {
  CurrentUser,
} from "../auth/decorators/current-user.decorator";


import {
  JwtAuthGuard,
} from "../auth/guards/jwt-auth.guard";


import {
  OrganizationService,
} from "../organizations/organization.service";



@Controller("search")
@UseGuards(JwtAuthGuard)

export class SearchController {


  constructor(

    private readonly searchService: SearchService,

    private readonly organizationService: OrganizationService,

  ){}



  @Get()

  async search(

    @Query() query: SearchQueryDto,

    @CurrentUser() user:any,

  ){


    const organizations =
      await this.organizationService.listUserOrganizations(
        user.id
      );


    const organizationIds =
      organizations.map(
        org => org.id
      );



    const results =
      await this.searchService.search(
        query.q,
        organizationIds,
      ) as any[];



    return {

      query: query.q,


      results: results.map((item:any) => ({

        id: item.id,

        title: item.title,

        description: item.description,

        category: item.entityType,


        href:
          item.entityType === "MATERIAL"
            ? `/dashboard/materials/${item.entityId}`
            : undefined,


      })),


    };


  }


}
