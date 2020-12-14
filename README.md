# MAPBOX in VT-localize

## Vector tile

Map tile is a primitive brick of a map. Obsoletely it was an png image. But in mapbox, it is protobuf (PBF) file, that contains vector data about:

- Geometries
- Metadata

### Encoding Geometry

Points, lines, and polygons = (x,y) pairs relative to top, left
