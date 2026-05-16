import { VendorCard } from "@/components/common/VendorCard";
import { RootLayout } from "@/components/layout/RootLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useVendors } from "@/hooks/useBackend";
import { useSearch } from "@tanstack/react-router";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Chaat",
  "Golgappa",
  "Chowmein",
  "Popcorn",
  "Ice Cream",
  "Tea & Coffee",
  "Dosa",
  "Pasta",
  "Mocktails",
  "Live BBQ",
];

const CATEGORY_EMOJI: Record<string, string> = {
  All: "🍽️",
  Chaat: "🍲",
  Golgappa: "🫙",
  Chowmein: "🍜",
  Popcorn: "🍿",
  "Ice Cream": "🍦",
  "Tea & Coffee": "☕",
  Dosa: "🥞",
  Pasta: "🍝",
  Mocktails: "🍹",
  "Live BBQ": "🔥",
};

export default function BrowsePage() {
  const rawSearch = useSearch({ from: "/browse" });
  const search = rawSearch as { category?: string; search?: string };
  const [query, setQuery] = useState(search?.search ?? "");
  const [category, setCategory] = useState(search?.category ?? "All");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filter = {
    ...(category && category !== "All" ? { category } : {}),
    verificationStatus: "approved" as const,
  };

  const { data: vendors = [], isLoading } = useVendors(filter);

  const filtered = vendors
    .filter(
      (v) =>
        !query ||
        v.businessName.toLowerCase().includes(query.toLowerCase()) ||
        v.serviceArea.toLowerCase().includes(query.toLowerCase()) ||
        v.category.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <RootLayout>
      {/* Page header */}
      <section className="bg-card border-b border-border/40">
        <div className="container py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant="outline"
              className="mb-3 text-primary border-primary/30"
            >
              All Vendors
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">
              Browse Food Stalls
            </h1>
            <p className="text-muted-foreground text-lg">
              Find verified wedding food stall vendors near you
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            className="mt-6 flex gap-2 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors, stall names, locations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-11"
                data-ocid="browse.search_input"
              />
            </div>
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters((p) => !p)}
              aria-label="Toggle filters"
              data-ocid="browse.filters.toggle"
            >
              <SlidersHorizontal className="size-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="bg-background">
        <div className="container py-8">
          {/* Category pills */}
          <motion.div
            className="flex flex-wrap gap-2 items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                  category === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted/50"
                }`}
                data-ocid={`browse.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                <span>{CATEGORY_EMOJI[cat]}</span>
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Expandable filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-4 items-center py-4 border-t border-border/40 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger
                        className="w-44 h-9 text-sm"
                        data-ocid="browse.sort.select"
                      >
                        <ChevronDown className="size-3 mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Top Rated</SelectItem>
                        <SelectItem value="price">
                          Price: Low to High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Loading vendors..."
                : `${filtered.length} vendor${filtered.length !== 1 ? "s" : ""} found${
                    category !== "All" ? ` in ${category}` : ""
                  }`}
            </p>
            {(category !== "All" || query) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                data-ocid="browse.clear_filters_button"
              >
                <X className="size-3 mr-1" /> Clear filters
              </Button>
            )}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Skeleton
                  key={`skeleton-browse-${n}`}
                  className="h-80 rounded-xl"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              className="flex flex-col items-center gap-4 py-24"
              data-ocid="browse.empty_state"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-6xl">🔍</span>
              <h3 className="font-display font-semibold text-2xl">
                No vendors found
              </h3>
              <p className="text-muted-foreground">
                {query
                  ? `No results for "${query}"`
                  : "No vendors in this category yet"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                data-ocid="browse.empty_state.clear_button"
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((vendor, i) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(i * 0.05, 0.4),
                  }}
                >
                  <VendorCard vendor={vendor} index={i} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
