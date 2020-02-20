$dir = Get-ChildItem ./lambda_functions -Directory
$outputDir = "./build"
$outputOldZips = Get-ChildItem -Path $outputDir -Recurse -Include *.zip

Write-Output "Cleaning output dir"
foreach ($z in $outputOldZips) {
  Remove-Item $z.FullName
}
Write-Output "Cleaning done!"



Write-Output "Building Lambda functions Zips"
foreach ($d in $dir) {
  $name = "$($outputDir)/$($d.Name).zip"
  $path = Join-Path -Path $d.FullName -ChildPath "*"
  Compress-Archive -Path $path -DestinationPath $name
}
Write-Output "Lambda functions Zipped!"


terraform apply



