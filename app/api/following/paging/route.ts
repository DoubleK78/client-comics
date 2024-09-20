import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getAxiosInstanceAsync } from "@/lib/axios";
import ServerResponse from "@/app/models/common/ServerResponse";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "401" });
    }

    const { searchParams } = new URL(request.url);
    const pageIndex = searchParams.get("pageIndex")
    const pageSize = searchParams.get("pageSize");
    const sortColumn = "updatedOnUtc";
    const sortDirection = "desc";

    try {
        const response = await (await getAxiosInstanceAsync()).get<ServerResponse<any>>(`/api/following/paging`, {
            params: {
                PageIndex: pageIndex,
                PageSize: pageSize,
                SearchTerm: "",
                SortColumn: sortColumn,
                SortDirection: sortDirection,
                sub: session?.user?.token?.sub
            }
        });

        return NextResponse.json(response.data.data);
    } catch (error) {
        return NextResponse.json({ error: "401" });
    }
}