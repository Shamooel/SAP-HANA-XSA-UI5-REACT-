"use client"

import { useState, useEffect } from "react"
import {
  Input,
  List,
  ListItemStandard,
  Card,
  Icon,
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/search.js"
import "../styles/SearchComponent.css"

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock data - replace with your actual data source
  const mockData = [
    { id: 1, title: "SAP UI5 Development", category: "Services" },
    { id: 2, title: "React Integration", category: "Features" },
    { id: 3, title: "Cloud Solutions", category: "Services" },
    { id: 4, title: "Contact Support", category: "Help" },
    { id: 5, title: "Documentation", category: "Resources" },
  ]

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setIsSearching(true)
        // Simulate API call
        const results = mockData.filter(
          item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results)
        setIsSearching(false)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Icon name="search" className="search-icon" />
        <Input
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && (
        <Card className="search-results">
          {isSearching ? (
            <div className="search-loading">Searching...</div>
          ) : searchResults.length > 0 ? (
            <List>
              {searchResults.map((result) => (
                <ListItemStandard key={result.id} className="search-result-item">
                  <FlexBox direction={FlexBoxDirection.Column}>
                    <Title level="H3">{result.title}</Title>
                    <Text className="search-result-category">{result.category}</Text>
                  </FlexBox>
                </ListItemStandard>
              ))}
            </List>
          ) : (
            <div className="no-results">No results found</div>
          )}
        </Card>
      )}
    </div>
  )
}

export default SearchComponent

