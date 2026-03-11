<script lang="ts">
    import { MapLibre, DefaultMarker } from 'svelte-maplibre';
    // Props — data passed IN from the parent page
    let { lon, lat, cityName } = $props<{
        lon: number;
        lat: number;
        cityName: string;
        }
        >();
</script>


<MapLibre center={[lon, lat]} zoom={10}
class="h-[400px] w-full rounded-lg mt-4"
style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json">
<DefaultMarker lngLat={[lon, lat]} />
</MapLibre>