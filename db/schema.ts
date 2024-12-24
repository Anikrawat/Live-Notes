import { integer, pgTable, varchar } from "drizzle-orm/pg-core";


export const documentTable = pgTable("documents",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title:varchar({length:255}).notNull(),
    description: varchar({length: 255}).notNull(),
    notepadState: varchar().default("{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"),
    userId: varchar({ length: 255 }).notNull(),
})
