
 //Local sample data uses date. Data from Dynamo may use DateModified. Try date first, then DateModified.
 
export function templateDateDisplay(template: HomeTemplate): string {
  return template.date || template.DateModified || '';
}
